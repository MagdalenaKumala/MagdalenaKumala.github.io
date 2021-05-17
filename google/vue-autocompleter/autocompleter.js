Vue.component('v-autocompleter', { 
    template: '<div class="s-box">
<img src="search.svg" class="search-icon">
<input ref="first" v-model="googleSearch" list="listaMiast" type="text" class="search_input" aria-label="Szukaj" maxlength="2048" @focus="focused = true" @keyup.down="down()" @keyup.up="up()"
@keyup.enter="enterClicked()"/>
<img src="klawiatura.png" class="keyboard-icon">
<img src="mikrofon.png" class="vs-icon">
<div class="cities">
  <li v-for="(city,index) in filteredCities" @click="handleClick(city.name)">
  <img class="glass" src="googleser.svg">
  <div class="podpowiedzi" v-html="highlight(city.name)"></div>
  
  </li>
</div>',
   
    data: function{ 
        return {
      googleSearch: '',
      isActive: 0,
      cities: window.cities,
    }
    },
    methods: {
        handleClick: function (name) {
          this.googleSearch = name;
          this.isActive = 1;
        },
        highlight: function(phrase) {
          return phrase.replaceAll(this.googleSearch, '<span class="highlight">' + this.googleSearch + '</span>')
        }
      },
    computed: {
      filteredCities: function () {
        if (this.googleSearch.length == 0) {
          return
        }
        let result = this.cities.filter(city => city.name.includes(this.googleSearch))

        if (result.length > 10) {
          result = result.slice(0, 10)
        }
        return result
      }
    },
    
  });
