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
  },

  randomImage: function (sourceArr) {
    let randomIndex = Math.floor(Math.random() * sourceArr.length);
    let picture = {
        type: 'photo',
        id: randomIndex.toString(),
        photo_url: sourceArr[randomIndex],
        thumb_url: sourceArr[randomIndex],
      }

    //Проверяем совпадает ли случайное число с числом которое уже было добавлено в id объекта
    for (let i = 0; i < usedIndexForRandom.length; i++) {
      if (randomIndex.toString() === usedIndexForRandom[i].id) {
        return randomImage(sourceArr);
      }
    }

    // Возвращаем объект изображения
    return picture;
  }
}