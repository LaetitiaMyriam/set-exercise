

// large sets are global variable so that they are computed once and shared
// across tests
l1 = new HashSet();
l2 = new HashSet();

for (var i = 0; i < 10000; i++) {
  l1.add(i);
}
for (var i = 0; i < 5000; i++) {
  l2.add(i);
}

describe("HashSet", function() {
  var s;

  beforeEach(function() {
    s = new HashSet();
  });

  it("should add elements to the set", function() {
    s.add("x");
    s.add("x");
    s.add("y");
    expect(s.contains("y")).toEqual(true);
  });

  it("should delete elements from the set", function() {
    s.add("x");
    s.add("y");
    s.delete("x");
    expect(s.contains("x")).toEqual(false);
  });

  it("should return length of the set", function() {
    s.add("x");
    s.add("y");
    s.add("z");
    s.add("z");
    s.add("z");
    expect(s.length()).toEqual(3);
  });

  it("should check if set is subset", function() {
    s.add("x");
    s.add("y");
    s.add("z");

    var s2 = new HashSet();
    s2.add("x")
    s2.add("y")

    expect(s2.isSubset(s)).toEqual(true);
    expect(s.isSubset(s2)).toEqual(false);
  });

  it("should union two sets", function() {
    s.add("x");
    s.add("y");
    s.add("z");

    var s2 = new HashSet();
    s2.add("x")
    s2.add("y")
    s2.add("q")

    expect(s.union(s2).print()).toEqual("{x, y, z, q}");
    expect(s2.union(s).print()).toEqual("{x, y, q, z}"); // order doesn't matter
  });

  it("should intersect two sets", function() {
    s.add("x");
    s.add("y");
    s.add("z");

    var s2 = new HashSet();
    s2.add("x")
    s2.add("y")
    s2.add("q")

    expect(s.intersect(s2).print()).toEqual("{x, y}");
    expect(s2.intersect(s).print()).toEqual("{x, y}");
  });

  // Enable tests by remove the 'x' in 'xdescribe'.
  xdescribe("timing tests (enable only once other tests pass; read HashSetSpec.js to enable)", function () {
    it("add 10000 elements 50000 times", function () {
      for (var i = 0; i < 50000; i++) {
        s.add(Math.floor(Math.random() * 10000));
      }

      expect(s.length() > 0).toBeTruthy();
    });

    it("add 10000 elements and then delete them all, one by one", function () {
      for (var i = 0; i < 10000; i++) {
        s.add(i);
      }

      for (var i = 0; i < 10000; i++) {
        s.delete(i);
      }

      expect(s.length()).toEqual(0);
    });

    describe("with two large sets", function () {
      it("contains check 10000 times", function () {
        for (var i = 0; i < 10000; i++) {
          l1.contains(i);
        }

        expect(l1.length() > 0).toBeTruthy();
      });

      it("isSubset", function () {
        l1.isSubset(l2);
        l2.isSubset(l1);

        expect(l1.length() > 0).toBeTruthy();
      });

      it("union", function () {
        l1.union(l2);
        l2.union(l1);

        expect(l1.length() > 0).toBeTruthy();
      });

      it("intersect", function () {
        l1.intersect(l2);
        l2.intersect(l1);

        expect(l1.length() > 0).toBeTruthy();
      });
    });
  });
});

