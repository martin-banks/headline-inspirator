
export default [
  {
    api_name: "datamuse",
    endpoint: "https://api.datamuse.com/words?",
    queries: [
      {
        name: 'Realated topics',
        description: '',
        query: ({ words, max }) => `topics=${words}&max=${max}`,
      },
      {
        name: 'Rhymes with',
        description: '',
        query: ({ words, max }) => `rel_rhy=${words}&max=${max}`,
      },
      {
        name: 'Similar in meaning',
        description: '',
        query: ({ words, max }) => `ml=${words}&max=${max}`,
      },
    ]
  },
]

