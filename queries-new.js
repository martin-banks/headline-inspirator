
export default {
  api_name: "datamuse",
  {
    queries: [
      {
        endpoint: "https://api.datamuse.com/words?",
        name: 'Realated topics',
        description: '',
        query: ({ words, max }) => `topics=${words}&max=${max}`,
        // query: function ({ words, max }) {
        //   return `${this.endpoint}topics=${words}&max=${max}`
        // },
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
  {
    url: 'some-link-url',
    queries: [
      function () { return this },
    ]
  }
}

