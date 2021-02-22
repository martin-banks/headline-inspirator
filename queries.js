export default {
  datamuse: function ({ words, max } = {}) {
    this.api_name = 'datamuse'
    this.endpoint = 'https://api.datamuse.com/words?'
    this.query = q => `${this.endpoint}${q}=${words}&max=${max}`

    return {
      queries: [
        {
          type: `${this.api_name}__ml`,
          name: 'Similar meaning',
          description: 'Words with similar meaning',
          query: this.query('ml'),
        },
        {
          type: `${this.api_name}__rel_rhy`,
          name: 'Rhyming',
          description: 'Words that rhyme',
          query: this.query('rel_rhy'),
        },
        {
          type: `${this.api_name}__topics`,
          name: 'Topics',
          description: 'Words with describing similar topics',
          query: this.query('topics'),
        },
      ]
    }
  },

}




