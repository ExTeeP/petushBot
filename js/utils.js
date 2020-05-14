module.exports = {
  // Дебагер
  debug: function (obj = {}) {
    return JSON.stringify(obj, null, 2)
  },

  // Рандомное число от 0 до int
  getRandomInt: function (int) {
    return Math.floor(Math.random() * int);
  },

  // Случайный элемент из массива
  getRandomElement: function (arr) {
    return arr[this.getRandomInt(arr.length)];
  }
};