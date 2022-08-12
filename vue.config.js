const path = require("path");
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        // NOTEIMPORTANT: je remplace @import et avec @use par curiosité et sa marche sans soucis. quelle surprise
        // NOTEIMPORTANT: pour pouvoir utiliser mes mixins dans mes single file components (.vue dans le <style> tag)...
        // ... il me faut ajouter les autres fichiers
        //... aussi, je dois ajouter les regles @use dans notre fichier css principale (main.scss)
        prependData: `
        @use "@/assets/sass/abstract/_variables.scss";
          @use "@/assets/sass/abstract/_mixins.scss";
            @use "@/assets/sass/main.scss"; 
          `,
      },
    },
  },

  // TESTING: pour les autres écrans
  devServer: {
    port: 8080,
    host: "0.0.0.0",
  },
};
