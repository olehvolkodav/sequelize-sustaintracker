export const questionnaire = [
  {
    name: 'General Company Information',
    questions: [
      {
        id: 'q0',
        title:
          'How many workers did the company have by 31 December of last calendar year?',
        unit: 'Headcount',
        indicator: 'Total workers headcount',
        year: '2020',
        tip: '## Markdown heading level 2\n\n![Image example](https://mdg.imgix.net/assets/images/san-juan-mountains.jpg "San Juan Mountains")\n\n**bold text**\nnormal text\n*italic text*\n\n**Helpful tips**\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pellentesque, nisl in iaculis blandit, tortor nunc laoreet erat, ut fermentum eros est at ligula. Donec fringilla consequat felis, vel semper ex placerat ac. Aenean efficitur, turpis ac vestibulum euismod, justo est feugiat nibh, in maximus eros nunc et ligula.\n\n**Why is this datapoint important?**\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pellentesque, nisl in iaculis blandit, tortor nunc laoreet erat, ut fermentum eros est at ligula. Donec fringilla consequat felis, vel semper ex placerat ac. Aenean efficitur, turpis ac vestibulum euismod, justo est feugiat nibh, in maximus eros nunc et ligula.\n\n**Examples of supporting evidence documents that you can upload:**\nSustainability Report, ESG Report, Corporate Social Responsibility Report, Dedicated page in website. Social Report.\n\nThe document(s) should demonstrate the following: that report of Social  and Human Capital information have been done and turned public,  including material Social and Human Capital information.\n\n**Standard reference code**\nSASB - CG-EC-130a.3a',
        previousData: [
          { year: '2017', value: '40' },
          { year: '2018', value: '45' },
          { year: '2019', value: '50' },
        ],
      },
      {
        id: 'q1',
        title:
          'What was the annual production of your principal activity (associated with principal CAE)?',
        unit: 'Un',
        indicator: 'Annual production of principal activity',
        year: '2020',
        tip: 'question 1 tip',
      },
      {
        id: 'q2',
        title:
          'What was the annual production of your secondary activity (associated with secondary CAE)?',
        unit: 'Un',
        indicator: 'Annual production of secondary activity',
        year: '2020',
        tip: 'Question 2 tip',
        previousData: [
          { year: '2017', value: '' },
          { year: '2018', value: '' },
          { year: '2019', value: '' },
        ],
      },
    ],
  },
  {
    name: 'Leadership and Governance',
    questions: [
      {
        id: 'q3',
        title: 'Does your company have all the operational permits valid?',
        indicator: 'All operational permits valid during the year',
        year: '2020',
        tip: 'Question 3 tip',
        isYesNoQuestion: true,
      },
      {
        id: 'q4',
        title:
          'Does the company publish public Social and Governance information?',
        indicator: 'Report of Social and Governance information',
        year: '2020',
        isYesNoQuestion: true,
      },
      {
        id: 'q5',
        title:
          'Does the company have an Ethic and Anti-bribery and Corruption Policy in place?',
        indicator: 'Ethics and Antibribery and Corruption Policy in place',
        year: '2020',
        isYesNoQuestion: true,
      },
    ],
  },
  {
    name: 'Environment',
    questions: [
      {
        id: 'q6',
        title: 'Does the company publish a public Environmental Report?',
        indicator: 'Environmental Policy',
        year: '2020',
        isYesNoQuestion: true,
      },
      {
        id: 'q7',
        title: 'Provide annual amount of Gross global scope 2 emissions',
        unit: 'eq/year',
        indicator: 'Gross global scope 2 emissions',
        year: '2020',
      },
    ],
  },
];
