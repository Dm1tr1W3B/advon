export const createQueryPath = (query) => {
  let newQueryParam = ''
  if (Object.keys(query).length) {
    Object.keys(query).forEach((element, index) => {
      if (index === 0) {
        newQueryParam = query[element] ? newQueryParam + `?${element}=${query[element]}` : newQueryParam
        return
      }
      if (Array.isArray(query[element]) && query[element].length) {
        query[element].forEach((queryId) => {
          newQueryParam = newQueryParam + `&${element}=${queryId}`
        })
        return
      }
      if (element === 'year') {
        newQueryParam = query[element] ? newQueryParam + `&${query[element]}` : newQueryParam
        return
      }
      newQueryParam = query[element] ? newQueryParam + `&${element}=${query[element]}` : newQueryParam
    })
  }
  return newQueryParam
}

export const createOptionsArray = (responseArray) => {
  if (responseArray && responseArray.length) {
    const optionsArray = responseArray.map((element) => {
      return {
        id: element.id,
        name: element.name,
        value: element.url || element.id
      }
    })
    return optionsArray
  }
  return []
}

export const createOptionsObject = (responseObj) => {
  if (responseObj && Object.keys(responseObj).length) {
    const newOptionsObj = Object.entries(responseObj).reduce((acc, [key, value]) => {
      if (Array.isArray(value)) {
        return {
          ...acc,
          [key]: createOptionsArray(value)
        }
      }
      return {
        ...acc,
        [key]: value
      }
    }, {})
    return newOptionsObj
  };
  return responseObj
}

export const createYearArrayObject = () => {
  const max = new Date().getFullYear()
  const min = 2000
  const years = []

  for (let i = max; i >= min; i--) {
    years.push({
      id: i,
      name: i,
      value: i
    })
  }
  return years
}

export const createYearQueryParam = (yearObj) => {
  const { yearFrom, yearTo, yearMin } = yearObj
  const todayYear = new Date().getFullYear()
  let yearStringParam = ''

  if (yearFrom && yearTo) {
    for (let i = yearFrom; i <= yearTo; i++) {
      yearStringParam = yearStringParam + `year=${i}${i === yearTo ? '' : '&'}`
    }
    return yearStringParam
  }
  if (yearFrom) {
    for (let i = yearFrom; i <= todayYear; i++) {
      yearStringParam = yearStringParam + `year=${i}${i === yearTo ? '' : '&'}`
    }
    return yearStringParam
  }
  if (yearTo) {
    for (let i = yearMin; i <= yearTo; i++) {
      yearStringParam = yearStringParam + `year=${i}${i === yearTo ? '' : '&'}`
    }
    return yearStringParam
  }
  return ``
}
