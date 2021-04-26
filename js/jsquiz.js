(function preguntas () {
    var preguntas = [{
        pregunta: "¿cual es el lenguaje estandar especifico para aplicar estilos a nuestras paginas web?",
        opciones: ["Java", "Html", "Php", "Css", "Ninguna de las anteriores"],
        correctAnswer: 3
    }, {
        pregunta: "¿Cuál es la versión actualmente vigente del estándar HTML?",
        opciones: ["HTML ", "HTML 3", "HTML 2", "HTML 6", "HTML 5 "],
        correctAnswer: 4
    }, {
        pregunta: "¿Cuál de estas etiquetas ayudaría a que los acentos se vieran bien en una página web? <>",
        opciones: ["meta charset=UTF-8", "accentuation=on", "meta ASCII=yes", "language=es", "Ninguna de las anteriores"],
        correctAnswer: 0
    }, {
        pregunta: "¿El title se encuentra dentro del body en una página web?",
        opciones: ["Falso","Verdadero","dentro y fuera", "fuera de el", "Ninguna de las antreriores"],
        correctAnswer: 0
    }, {
        pregunta: " ¿Qué etiqueta utilizamos para insertar una línea horizontal?",
        opciones: ["br", "ht", "hr", "HTML", "ln"],
        correctAnswer: 2
    }, {
        pregunta: "¿Elija la etiqueta que nos dá el título más grande? <>",
        opciones: ["h5", "h7", "h2", "h1", "Ninguna de las anteriores"],
        correctAnswer: 3
    }, {
        pregunta: "El Front se encarga de hacer la conexion con el servidor",
        opciones: ["Falso","Verdadero", "se encarga el back","javaScrip", "Ninguna de las antreriores"],
        correctAnswer: 1
    }, {
        pregunta: " ¿Qué etiqueta define un salto de línea?",
        opciones: ["bh",  "body", "td","th", "br"],
        correctAnswer: 4
    }];


    

    contador_preguntas = 0;
    var seleccion = [];
    var test = $('#test');


    mostrar_Siguiente();


    $('#siguiente').on('click', function (e) {
        e.preventDefault();

        if (test.is(':animated')) {
            return false;
        }
        escoger();


        if (isNaN(seleccion[contador_preguntas])) {
            alert('Seleccione una respuesta');
        } else {
            contador_preguntas++;
            mostrar_Siguiente();
        }
    });

   
    $('#anterior').on('click', function (e) {
        e.preventDefault();

        if (test.is(':animated')) {
            return false;
        }
        escoger();
        contador_preguntas--;
        mostrar_Siguiente();
    });

    
    $('#empezar').on('click', function (e) {
        e.preventDefault();

        if (test.is(':animated')) {
            return false;
        }
        contador_preguntas = 0;
        seleccion = [];
        mostrar_Siguiente();
        $('#empezar').hide();
    });


    function elemento_Pregunta(index) {
        var qElement = $('<div>', {
            id: 'pregunta'
        });

        var titulo = $('<h2>Pregunta selecction multiple #' + (index + 1) + ':</h2>');
        qElement.append(titulo);

        var pregunta = $('<p>').append(preguntas[index].pregunta);
        qElement.append(pregunta);

        var radioButtons = crear_Radios(index);
        qElement.append(radioButtons);

        return qElement;
    }

    
    function crear_Radios(index) {
        var radioList = $('<ul>');
        var item;
        var input = '';
        for (var i = 0; i < preguntas[index].opciones.length; i++) {
            item = $('<li>');
            input = '<input  type="radio" name="answer" value=' + i + ' />';
            input += preguntas[index].opciones[i];
            item.append(input);
            radioList.append(item);
        }
        return radioList;
    }

   
    function escoger() {
        seleccion[contador_preguntas] = +$('input[name="answer" ]:checked').val();
    }

    
    function mostrar_Siguiente() {
        test.fadeOut(function () {
            $('#pregunta').remove();

            if (contador_preguntas < preguntas.length) {
                var siguiente_Pregunta = elemento_Pregunta(contador_preguntas);
                test.append(siguiente_Pregunta).fadeIn();
                if (!(isNaN(seleccion[contador_preguntas]))) {
                    $('input[value=' + seleccion[contador_preguntas] + ']').prop('checked', true);
                }

          
                if (contador_preguntas === 1) {
                    $('#anterior').show();
                } else if (contador_preguntas === 0) {

                    $('#anterior').hide();
                    $('#siguiente').show();
                }
            } else {
                var puntajeElem = mostrar_Puntuacion();
                test.append(puntajeElem).fadeIn();
                $('#siguiente').hide();
                $('#anterior').hide();
                $('#empezar').show();
            }
        });
    }


    function mostrar_Puntuacion() {

     

        var puntaje = $('<p>', { id: 'pregunta' });
        var numCorrect = 0;
        for (var i = 0; i < seleccion.length; i++) {
            if (seleccion[i] === preguntas[i].correctAnswer) {
                numCorrect++;
            }
        }

        puntaje.append('Tienes ' + numCorrect + ' correctas de ' +
            preguntas.length + '!!!');
        
        return puntaje;
    }
   
 
})();
