
export const capsFirstLetterOfSentence = (sentence = "") => {
  const modifiedSentence = sentence.replace(/\s\s+/g, ' ');
  const words = modifiedSentence.trim().split(' ');
  let newSentence = ''; 

  if (modifiedSentence && words.length > 0) {
    words
    .map(item => item.replace(/^./, item[0].toUpperCase()))
    .forEach((item, index) =>  {
      newSentence = newSentence + item + (index === words.length - 1 ? "" : " ")
    });
  }
  
  return newSentence;
}

export const debounce = (cb, delay) => {
  let timer;
  return function() {
    clearInterval(timer);
    timer = setTimeout(() => {
      cb()
    }, delay);
  }
}