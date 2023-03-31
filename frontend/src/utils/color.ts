type Item = HTMLImageElement | string;

type Args = {
  amount: number;
  format: string;
  group: number;
  sample: number;
};

type Data = Uint8ClampedArray;

type Hex = string;

type Rgb = [r: number, g: number, b: number];

type Input = (Hex | Rgb)[];

type Output = Hex | Rgb | (Hex | Rgb)[];

const getSrc = (item: Item): string =>
  typeof item === 'string' ? item : item.src;

const getArgs = ({
  amount = 3,
  format = 'array',
  group = 20,
  sample = 10,
} = {}): Args => ({ amount, format, group, sample });

const rgbToHex = (rgb: Rgb): Hex =>
  `#${rgb
    .map((val) => {
      const hex = val.toString(16);
      return hex.length === 1 ? `0${hex}` : hex;
    })
    .join('')}`;

const format = (input: Input, args: Args): Output => {
  const list = input.map((val) => {
    const rgb = Array.isArray(val) ? val : (val.split(',').map(Number) as Rgb);
    return args.format === 'hex' ? rgbToHex(rgb) : rgb;
  });
  return args.amount === 1 || list.length === 1 ? list[0] : list;
};

const group = (number: number, grouping: number): number => {
  const grouped = Math.round(number / grouping) * grouping;
  return Math.min(grouped, 255);
};

const getImageData = (src: string): Promise<Data> =>
  new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const context = <CanvasRenderingContext2D>canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.height = img.height;
      canvas.width = img.width;
      context.drawImage(img, 0, 0);

      const { data } = context.getImageData(0, 0, img.width, img.height);

      resolve(data);
    };

    img.onerror = () => reject(Error('Image loading failed.'));
    img.crossOrigin = '';
    img.src = src;
  });

const prominent = (data: Data, args: Args): Output => {
  const gap = 4 * args.sample;
  const colors: { [key: string]: number } = {};

  for (let i = 0; i < data.length; i += gap) {
    if (data[i + 3] !== 0) {
      const rgb = [
        group(data[i], args.group),
        group(data[i + 1], args.group),
        group(data[i + 2], args.group),
      ].join();

      colors[rgb] = colors[rgb] ? colors[rgb] + 1 : 1;
    }
  }

  return format(
    Object.entries(colors)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .sort(([_keyA, valA], [_keyB, valB]) => (valA > valB ? -1 : 1))
      .slice(0, args.amount)
      .map(([rgb]) => rgb),
    args
  );
};

export const getProminentColor = (
  item: Item,
  args?: Partial<Args>
): unknown => {
  return new Promise((resolve, reject) =>
    getImageData(getSrc(item))
      .then((data) => resolve(prominent(data, getArgs(args))))
      .catch((error) => reject(error))
  );
};
