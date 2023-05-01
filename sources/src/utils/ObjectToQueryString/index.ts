function ObjectToQueryString(obj: any) {
  try {
    const keyValuePairs = [];
    for (const key in obj) {
      keyValuePairs.push(
        `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`,
      );
    }
    return keyValuePairs.join('&');
  } catch (err) {
    return '';
  }
}

export default ObjectToQueryString;
