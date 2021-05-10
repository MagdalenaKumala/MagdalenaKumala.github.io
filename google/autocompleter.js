Vue.component('v-autocompleter', {
    template: ' <div class="czesc"><div class="krzyzyk"><img title="Wyczyść" class="ikona_input-clear" src="Obrazki/iks.svg"/><span class="kreska"></span></div><img class="ikona_input-keyboard" src="Obrazki/klawiatura.svg"/><img class="ikona_input-mikrofon" src="Obrazki/mikrofon.png"/><button id="przycisk_szukaj"><img class="ikona_input" src="Obrazki/lupa_2.svg"/></button></div><div  id="wypisz_miasta" class="miasta_lista" :class="{widok : googleSearch.length > 0 /*&& skupienie*/ && filtrowaneMiasta.length>0}" ><ul ><li  v-for="(miasto,index) in filtrowaneMiasta" ><div class="lista_elementow" :class="{klasa_skupienie:index == zaznaczenie}"><img class="ikona_input" src="Obrazki/lupa.svg" /><a href="#" v-html="wytluszcz(miasto)" v-on:click="wybrane(index)"><b>{{ miasto }}</b></a> </div></li></ul></div> ',

    data: function () {
        return {
            googleSearch: '',
            searchedInput:'',
            filtrowaneMiasta:"",
            cities: window.cities,
            filtrowane_miasta_aktualizacja:true,
            skupienie: false,
            zmiana: false,
            zaznaczenie: -1,
        }
    },
    watch: 
        {
            zaznaczenie: function () 
            {
            this.filtrowane_miasta_aktualizacja=false;
            this.googleSearch=this.filtrowaneMiasta[this.zaznaczenie].name;
            },
            googleSearch: function()
            {
                this.filtrowane_miasta_utworz(this.filtrowane_miasta_aktualizacja);
                this.filtrowane_miasta_aktualizacja=true;
                console.log(this.filtrowaneMiasta);
                if(this.zaznaczenie==-1)
                {
                    this.searchedInput=this.googleSearch;      
                }
            }
        },
        methods:
        {
            enter() 
            {
                this.filtrowaneMiasta=true;
                this.zmiana= true;
                this.zaznaczenie=-1;
                this.skupienie = false;
             },
            dol()
            {
                if(this.zaznaczenie<this.filtrowaneMiasta.length-1)
                {
                    this.zaznaczenie+=1; 
                }
                else if(this.zaznaczenie==this.filtrowaneMiasta.length-1)
                {
                    this.zaznaczenie=0; 
                }
             },
             gora()
             {
                if(this.zaznaczenie>0)
                {
                    this.zaznaczenie-=1; 
                }
                else if(this.zaznaczenie==0)
                {
                    this.zaznaczenie=this.filtrowaneMiasta.length-1;
                }
             },
             wybrane(i)
             {
                this.googleSearch=this.filtrowaneMiasta[i].name;
                this.enter();
             },
             aktywne()
             {
                if(this.googleSearch.length==0){
                    this.zmiana=false;
                }
                return this.zmiana;
             },
             filtrowane_miasta_utworz(prawda)
             {
                 if(prawda)
                 {
                    let result=this.cities.filter(miasto => miasto.name.includes(this.googleSearch));
                    if(result.length>10)
                    {
                        this.filtrowaneMiasta= result.slice(1, 11);
                    }
                    else{
                        this.filtrowaneMiasta= result;
                    }
                    this.zaznaczenie=-1;
                 }   
             },
             wytluszcz(miasto)
            {
                let re = new RegExp(this.searchedInput,"gi");
                let bolden="<b>"+miasto.name.replace(re, match=>
                    {
                     return "<span class='zwykly'>"+ match+"</span>";
                    })+"</b>";
                console.log(bolden);
                return bolden;
            }      
        }
    })
    margin:0px;
}
