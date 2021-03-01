
function processDictPage (page) {

  if (!page || typeof page !== 'string') {
    console.error('--- A string of the page must be supplied ---')
    return undefined
  }

  const idioms = []
  const idiomsAdditional = []

  // Separate the idioms list from the main results of the page
  // not all results will have this information; should return an empty array if no matches are found
  page
    .replace(/^[\s|\S|a-z|A-Z|0-9]+\<div id\=Definition\>/i, '')
    .split('<section')
    .filter(a => a.includes('<h2>'))
    .map(b => b.split('<h2>'))
    .map(c => c
      .filter(d => !d.includes('data-src='))
      .map(e => e
        .replace(/<\/h2>[\s|\S\.]+/, '')
        .replace(/<\/span>/gi, '')
        .replace(/\<span class=\"idir\"\>/, '')
      )
    )
    .forEach(f => {
      console.log({ f })
      idioms.push(...f)
    })

  // Most (if not all) results will have a list of related content later in the page
  // This is useful for pages where no main results are returned
  page
    .split('<section>')
    .filter(x => !x.includes('<!Doctype html>'))
    .map(x => x
      .split('<aside')[0]
      .split('<li>')
      .filter(x => !x.includes('<b>See also:</b>'))
      .map(x => x
        .split('">')
        .filter(x => !x.includes('<a href="'))
        .map(x => x
          .replace('</a></li>', '')
          .replace(/<\/ul><\/section>[\s|\S|.]+/, '')
        )
        .filter(x => x.length)
        .filter(x => !x.includes('See:<ul class='))
        .forEach(x => idiomsAdditional.push(x))
      )
    )

    const output = [...new Set([...idioms, ...idiomsAdditional])]
    console.log({ output })
    return output
}

export default processDictPage
