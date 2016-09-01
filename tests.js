var _ = require("lodash");
var test = require("tape");
var levelup = require("levelup");
var memdown = require("memdown");
var safejson = require("./");

var assertRecode = function(db, t, input, has_in_err, output, has_out_err){
  var key = _.uniqueId();
  db.put(key, input, function(err){
    if(has_in_err){
      t.ok(err, "expected write error");
      return;
    }else{
      if(err) return t.fail(err + "");
    }
    db.get(key, function(err, data){
      if(has_out_err){
        t.ok(err, "expected write error");
        return;
      }else{
        if(err) return t.fail(err + "");
      }
      t.equals(data, output);
    });
  });
};

test("the problem exists in level-codec json", function(t){
  var db = levelup("/blah", {
    db: memdown,
    keyEncoding: "utf-8",
    valueEncoding: "json"
  });

  var a = _.partial(assertRecode, db, t);

  t.plan(4);
  a("a", false, "a", false);
  a(null, false, null, false);
  a(NaN, false, null, false);
  a(void 0, false, void 0, true);//expected bad behavior
});

test("the problem is fixed with this codec", function(t){
  var db = levelup("/blah", {
    db: memdown,
    keyEncoding: "utf-8",
    valueEncoding: safejson
  });

  var a = _.partial(assertRecode, db, t);

  t.plan(4);
  a("a", false, "a", false);
  a(null, false, null, false);
  a(NaN, false, null, false);
  a(void 0, false, null, false);//notice it coreced to null
});
