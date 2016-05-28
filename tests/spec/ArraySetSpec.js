

// large sets are global variable so that they are computed once and shared
// across tests
large1 = new ArraySet();
large2 = new ArraySet();

for (var i = 0; i < 10000; i++) {
  large1.add(i);
}
for (var i = 0; i < 5000; i++) {
  large2.add(i);
}

describe("ArraySet", function() {
  var s;

  beforeEach(function() {
    s = new ArraySet();
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

    var s2 = new ArraySet();
    s2.add("x")
    s2.add("y")

    expect(s2.isSubset(s)).toEqual(true);
    expect(s.isSubset(s2)).toEqual(false);
  });

  it("should union two sets", function() {
    s.add("x");
    s.add("y");
    s.add("z");

    var s2 = new ArraySet();
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

    var s2 = new ArraySet();
    s2.add("x")
    s2.add("y")
    s2.add("q")

    expect(s.intersect(s2).print()).toEqual("{x, y}");
    expect(s2.intersect(s).print()).toEqual("{x, y}");
  });

  // Enable tests by remove the 'x' in 'xdescribe'.
  xdescribe("timing tests (enable only once other tests pass; read ArraySetSpec.js to enable)", function () {
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
          large1.contains(i);
        }

        expect(large1.length() > 0).toBeTruthy();
      });

      it("isSubset", function () {
        large1.isSubset(large2);
        large2.isSubset(large1);

        expect(large1.length() > 0).toBeTruthy();
      });

      it("union", function () {
        large1.union(large2);
        large2.union(large1);

        expect(large1.length() > 0).toBeTruthy();
      });

      it("intersect", function () {
        large1.intersect(large2);
        large2.intersect(large1);

        expect(large1.length() > 0).toBeTruthy();
      });
    });
  });
});

