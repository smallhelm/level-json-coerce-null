module.exports = {
  encode: function(val){
    if(val === void 0){
      return "null";
    }
    return JSON.stringify(val);
  },
  decode: function(val){
    if(val === ""){//this was likely inserted in the db by encode(void 0)
      return null;
    }
    return JSON.parse(val);
  },
  buffer: false,
  type: "json-coerce-null"
};
