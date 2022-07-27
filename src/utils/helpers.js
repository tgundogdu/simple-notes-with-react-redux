/**
 * 
 * @returns it returns auto increment fake id. for notes. 
 */
 var fakeUniqueId = 1000;
const generateId = () => {
  return ++fakeUniqueId;
};

/**
 * It returns a random number between min and max number.
 * @param {number} min 
 * @param {number} max 
 * @returns {number} returns a random number between min and max.
 */
const randNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};


/**
 * It takes random color type rgb, hex. Default is rgb. 
 * @param {string} type
 * @returns {string} it returns random hexadecimal or rgb color.
 */
const randColor = (type = "rgb") => {
  let color = "";
  if (type === "hex") {
    color = "#000000".replace(/0/g, function () {
      return (~~(Math.random() * 16)).toString(16);
    });
  } else {
    color = `rgb(${randNumber(0, 255)}, ${randNumber(0, 255)}, ${randNumber(
      0,
      255
    )})`;
  }
  return color;
};


/**
 * it returns rgb or rgba format of given hexadecimal color.
 * @param {string} hex hexadecimal color which will be return
 * @param {float} alpha default empty. if it is empty returns rgb, if it is not returns rgba with color opacitiy. 
 * @returns {string} rgb or rgba color.
 */
const hexToRGB = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  } else {
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }
};


/**
 * it takes two array and merge them. and it creates new array with unique values.
 * @param {array} arr1 first array
 * @param {array} arr2  second array
 * @returns {array} it returns array with unique values
 */
const getUniqueSet = (arr1, arr2) => {
  let newArr = [...arr1, ...arr2];
  newArr = [...new Set(newArr)];
  return newArr.sort();
};


/**
 * it is merge all tags arrays and creates with new array with the unique values.
 * @param {array} data array list with tags key
 * @returns it returns unique values with new array.
 */
const getTagsFromNotes = (data) => {
  let tags = [];
  data.forEach((item) => {
    tags = [...tags, ...item.tags];
  });

  tags = [...new Set(tags)].sort();
  return tags;
};


/**
 * 
 * @param {array} data notes array.
 * @param {object} filters filters object.
 * @returns returns filtered notes (if any). applying filter and returns filtered lists.
 */
const applyFilters = (data, filters) => {
  const { query, tags, order } = filters;

  let filteredData = data;
  if (tags.length) {
    filteredData = data.filter((item) => {
      return item.tags.some((r) => tags.includes(r));
    });
  }

  if (query.length > 0) {
    filteredData = filteredData.filter((item) => {
      const searchInTitle = item.title.toLowerCase().indexOf(query.toLowerCase()) >= 0;
      const searchInContent = item.content.toLowerCase().indexOf(query.toLowerCase()) >= 0;
      return searchInTitle || searchInContent;
    });
  }

  if (order) {
    const orderField = Object.keys(order)[0];
    const orderValue = order[orderField];

    if (orderField === 'title'){
      filteredData.sort((a, b) => {
          return orderValue === 'DESC' ? b.title.localeCompare(a.title) : a.title.localeCompare(b.title)
      });
    }

    if (orderField === 'date'){
      filteredData.sort((a, b) => {
          return orderValue === 'DESC' ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date)
      });
    }
  }

  return filteredData;
};


/**
 * exporting all the helper methods.
 */
export {
  randNumber,
  randColor,
  getUniqueSet,
  getTagsFromNotes,
  generateId,
  hexToRGB,
  applyFilters,
};
