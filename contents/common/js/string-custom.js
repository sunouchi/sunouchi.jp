var StringCustom = (function() {
  function StringCustom() {
    String.prototype.replaceAll = function(org, dest) {
      return this.split(org).join(dest);
    };
  }

  return StringCustom();
});

new StringCustom();