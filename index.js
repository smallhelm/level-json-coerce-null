module.exports = {
  encode: function(val){
    if(val === void 0){
      return "null";
    }
    return JSON.stringify(val);
  },
  decode: JSON.parse,
  buffer: false,
  type: "safejson"
};
