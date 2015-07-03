/* Todo model */
'use strict';

module.exports = function(_) {
  return {
    /**
     * Get data from array or localStorage
     * @return {array} data
     */
    data: function() {
      /* Define data array */
      var data = [
        {
          id: 1,
          name: 'task 1',
          finished: false
        }
      ];

      /* Get data from localStorage if exists*/
      if(localStorage.data !== undefined) {
        data = JSON.parse(localStorage.data);
      }

      return data;
    },

    /* Execute getting data */
    getData: function() {
      return this.data();
    },

    /* Set data to localStorage */
    setData: function(data) {
      localStorage.data = JSON.stringify(data);
    },

    /**
     * Find index by item's id
     * @param  {string} id: item's id
     * @return {int} index
     */
    findIndexById: function(id) {
      /* Get data array to find item's id within it */
      var items = this.getData();

      return _.findIndex(items, function(item) {
        return item.id === parseInt(id);
      });
    },

    /**
     * Get all data in data array
     * @return {array} items
     */
    findAll: function() {
      var items = this.getData();

      /* Set data to localStorage */
      this.setData(items);
      return items;
    },

    /**
     * Create new id for new item
     * @return {int} id
     */
    newId: function() {
      var items = this.getData();
      return parseInt(_.last(items).id) + 1;
    },

    /**
     * Add new item
     * @param {object} newItem
     */
    add: function(data) {
      /* Init new item object */
      var newItem = {};

      /* Fill values for each keys of item object */
      newItem.id = this.newId();
      newItem.name = data.name;
      newItem.finished = false;

      /* Get data array */
      var items = this.getData();

      /* Push new item into data array */
      items.push(newItem);

      /* Save again data into localStorage */
      this.setData(items);

      return newItem;
    },

    /**
     * Edit one todo
     * @param  {string} id
     * @param  {object} editedItem
     * @return {object} items[index]: updated item
     */
    edit: function(id, editedItem) {
      /* Get index by id */
      var index = this.findIndexById(id);

      /* Get data array */
      var items = this.getData();

      /* Update item by editedItem */
      items[index] = editedItem;

      /* Save again data into localStorage */
      this.setData(items);

      return items[index];
    },

    /**
     * Delete a todo
     * @param  {string} id
     * @return {boolean} result
     */
    delete: function(id) {
      var match = false;

      /* Get data array */
      var items = this.getData();

      /* Delete todo with id */
      _.each(items, function(item, index) {
        if(item) {
          if (item.id === parseInt(id)) {
            match = true;
            items.splice(index, 1);
          }
        }
      });

      /* Save again data into localStorage */
      this.setData(items);

      return match;
    },

    /**
     * Clear finished todo
     * @return {boolean} result: clear success or not
     */
    clear: function() {
      /* Get data array */
      var items = this.getData();

      try {
        var deleteArr = [];

        /* Mark finished todo into deleteArr array */
        _.forEach(items, function(item) {
          if(item.finished) {
            deleteArr.push(item);
          }
        });

        /* Delete finished todo from deleteArr */
        _.forEach(deleteArr, function(item) {
          items.splice(items.indexOf(item), 1);
        });
      } catch(err) {
        return false;
      }

      /* Save again data into localStorage */
      this.setData(items);

      return true;
    }
  };
};
