document.addEventListener('DOMContentLoaded', function() {
    // Configuración inicial
    const year = new Date().getFullYear();
    let currentMonth = new Date().getMonth();
    let currentYear = year;
    
    // Elementos del DOM
    const calendarEl = document.getElementById('calendar');
    const monthYearEl = document.getElementById('month-year');
    const audioPlayerEl = document.getElementById('audio-player');
    const audioTitleEl = document.getElementById('audio-title');
    const audioElementEl = document.getElementById('audio-element');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const yearSelectEl = document.getElementById('year-select');
    const monthSelectEl = document.getElementById('month-select');
    const todayBtn = document.getElementById('today-btn');

    // Colores litúrgicos
    const liturgicalColors = {
        'tn': '#8B0000',     // Rojo vino para Navidad
        'to': '#556B2F',     // Verde olivo para Tiempo Ordinario
        'tc': '#800080',     // Morado para Cuaresma
        'tp': '#87CEEB',     // Azul cielo para Pascua
        'ta': '#800080'      // Morado para Adviento
    };

    // Lista de audios con tiempo litúrgico
    const audios = [
        /* Enero - Navidad (tn) */
        { nombre: "Santa María, Madre de Dios", archivo: "/ev/tn/2/mie/audio.mp3", fecha: `2025-01-01`, tiempo: 'tp' },
        { nombre: "Semana I de Navidad",        archivo: "/ev/tn/2/jue/audio.mp3", fecha: `2025-01-02`, tiempo: 'tn' },
        { nombre: "Semana I de Navidad",        archivo: "/ev/tn/2/vie/audio.mp3", fecha: `2025-01-03`, tiempo: 'tn' },
        { nombre: "Semana I de Navidad",        archivo: "/ev/tn/2/sab/audio.mp3", fecha: `2025-01-04`, tiempo: 'tn' },
        { nombre: "Semana I de Navidad",        archivo: "/ev/tn/2/dom/audio.mp3", fecha: `2025-01-05`, tiempo: 'tn' },
        { nombre: "La Epifanía del Señor",      archivo: "/ev/tn/2/lun/audio.mp3", fecha: `2025-01-06`, tiempo: 'tp' },
        { nombre: "Después de la Epifanía",     archivo: "/ev/tn/2/mar/audio.mp3", fecha: `2025-01-07`, tiempo: 'tn' },
        { nombre: "Después de la Epifanía",     archivo: "/ev/tn/2/mie/audio.mp3", fecha: `2025-01-08`, tiempo: 'tn' },
        { nombre: "Después de la Epifanía",     archivo: "/ev/tn/2/jue/audio.mp3", fecha: `2025-01-09`, tiempo: 'tn' },
        { nombre: "Después de la Epifanía",     archivo: "/ev/tn/2/vie/audio.mp3", fecha: `2025-01-10`, tiempo: 'tn' },
        { nombre: "Después de la Epifanía",     archivo: "/ev/tn/2/sab/audio.mp3", fecha: `2025-01-11`, tiempo: 'tn' },

        /* TIEMPO ORDINARIO */

        { nombre: "El Bautismo del Señor",          archivo: "/ev/to/1/dom/audio.mp3", fecha: `2025-01-12`, tiempo: 'tp' },
        { nombre: "Tiempo Ordinario, Semana I",     archivo: "/ev/to/1/lun/audio.mp3", fecha: `2025-01-13`, tiempo: 'to' },
        { nombre: "Tiempo Ordinario, Semana I",     archivo: "/ev/to/1/mar/audio.mp3", fecha: `2025-01-14`, tiempo: 'to' },
        
        /* Abril - Cuaresma (tc) */
        { nombre: "IV Semana de Cuaresma", archivo: "/ev/tc/4/mar/audio.mp3", fecha: `2025-04-01`, tiempo: 'tc' },
        { nombre: "IV Semana de Cuaresma", archivo: "/ev/tc/4/mie/audio.mp3", fecha: `2025-04-02`, tiempo: 'tc' },
        { nombre: "IV Semana de Cuaresma", archivo: "/ev/tc/4/jue/audio.mp3", fecha: `2025-04-03`, tiempo: 'tc' },
        { nombre: "IV Semana de Cuaresma", archivo: "/ev/tc/4/vie/audio.mp3", fecha: `2025-04-04`, tiempo: 'tc' },
        
        /* Abril 2026 - Cuaresma (tc) */
        { nombre: "IV Semana de Cuaresma", archivo: "/ev/tc/4/jue/audio.mp3", fecha: `2026-04-01`, tiempo: 'tc' },
        
        /* Ejemplos adicionales */
        { nombre: "Domingo de Pascua", archivo: "/ev/tp/1/dom/audio.mp3", fecha: `2025-04-20`, tiempo: 'tp' },
        { nombre: "Tiempo Ordinario", archivo: "/ev/to/10/lun/audio.mp3", fecha: `2025-06-09`, tiempo: 'to' },
        { nombre: "Primer Domingo de Adviento", archivo: "/ev/ta/1/dom/audio.mp3", fecha: `2025-11-30`, tiempo: 'ta' }
    ];

    // Nombres de los meses
    const monthNames = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    // Nombres de los días
    const dayNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

    // Inicializar selectores de año y mes
    function initSelectors() {
        // Años disponibles
        const years = [year - 1, year, year + 1];
        years.forEach(y => {
            const option = document.createElement('option');
            option.value = y;
            option.textContent = y;
            yearSelectEl.appendChild(option);
        });
        yearSelectEl.value = currentYear;

        // Meses
        monthNames.forEach((month, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = month;
            monthSelectEl.appendChild(option);
        });
        monthSelectEl.value = currentMonth;
    }

    // Determinar el tiempo litúrgico basado en la ruta del archivo
    function getLiturgicalTime(audio) {
        if (!audio) return null;
        
        // Si ya tiene la propiedad tiempo, usarla
        if (audio.tiempo) return audio.tiempo;
        
        // Determinar por la ruta del archivo
        const path = audio.archivo.toLowerCase();
        if (path.includes('/tn/')) return 'tn';
        if (path.includes('/to/')) return 'to';
        if (path.includes('/tc/')) return 'tc';
        if (path.includes('/tp/')) return 'tp';
        if (path.includes('/ta/')) return 'ta';
        return null;
    }

    // Generar el calendario
    function generateCalendar(year, month) {
        calendarEl.innerHTML = '';
        monthYearEl.textContent = `${monthNames[month]} ${year}`;

        // Encabezados de los días
        ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'day-header';
            dayHeader.textContent = day;
            calendarEl.appendChild(dayHeader);
        });

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const today = new Date();

        // Días vacíos al inicio
        for (let i = 0; i < firstDay.getDay(); i++) {
            calendarEl.appendChild(document.createElement('div')).className = 'empty-day';
        }

        // Días del mes
        for (let date = 1; date <= lastDay.getDate(); date++) {
            const dayEl = document.createElement('div');
            dayEl.className = 'day';
            dayEl.textContent = date;

            const currentDate = new Date(year, month, date);
            const dateStr = formatDate(currentDate);
            const audioForDay = audios.find(audio => audio.fecha === dateStr);
            const tiempo = getLiturgicalTime(audioForDay);

            // Aplicar color de fondo según el tiempo litúrgico
            if (tiempo && liturgicalColors[tiempo]) {
                dayEl.style.backgroundColor = liturgicalColors[tiempo] + '20'; // Agrega transparencia
                dayEl.style.borderLeft = `3px solid ${liturgicalColors[tiempo]}`;
            }

            // Resaltar día actual
            if (currentDate.toDateString() === today.toDateString()) {
                dayEl.classList.add('today');
                if (audioForDay) {
                    playAudio(audioForDay, currentDate);
                }
            }

            // Mostrar información del audio si existe
            if (audioForDay) {
                const infoEl = document.createElement('div');
                infoEl.className = 'audio-info';
                infoEl.textContent = audioForDay.nombre;
                dayEl.appendChild(infoEl);
            }

            // Evento click para reproducir audio
            dayEl.addEventListener('click', function() {
                if (audioForDay) {
                    playAudio(audioForDay, currentDate);
                }
            });

            calendarEl.appendChild(dayEl);
        }
    }

    // Reproducir audio
    function playAudio(audio, date) {
        audioTitleEl.textContent = `${dayNames[date.getDay()]} ${date.getDate()} de ${monthNames[date.getMonth()]}: ${audio.nombre}`;
        audioElementEl.src = audio.archivo;
        audioElementEl.load();
        
        // Cambiar color del reproductor según el tiempo litúrgico
        const tiempo = getLiturgicalTime(audio);
        if (tiempo && liturgicalColors[tiempo]) {
            audioPlayerEl.style.backgroundColor = liturgicalColors[tiempo] + '20';
            audioPlayerEl.style.borderLeft = `5px solid ${liturgicalColors[tiempo]}`;
        }
        
        audioPlayerEl.style.display = 'block';
    }

    // Formatear fecha como YYYY-MM-DD
    function formatDate(date) {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
    }

    // Navegación
    prevMonthBtn.addEventListener('click', function() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
            yearSelectEl.value = currentYear;
        }
        monthSelectEl.value = currentMonth;
        generateCalendar(currentYear, currentMonth);
    });

    nextMonthBtn.addEventListener('click', function() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
            yearSelectEl.value = currentYear;
        }
        monthSelectEl.value = currentMonth;
        generateCalendar(currentYear, currentMonth);
    });

    // Cambiar año/mes
    yearSelectEl.addEventListener('change', function() {
        currentYear = parseInt(this.value);
        generateCalendar(currentYear, currentMonth);
    });

    monthSelectEl.addEventListener('change', function() {
        currentMonth = parseInt(this.value);
        generateCalendar(currentYear, currentMonth);
    });

    // Botón "Hoy"
    todayBtn.addEventListener('click', function() {
        const today = new Date();
        currentYear = today.getFullYear();
        currentMonth = today.getMonth();
        yearSelectEl.value = currentYear;
        monthSelectEl.value = currentMonth;
        generateCalendar(currentYear, currentMonth);
    });

    // Inicializar
    initSelectors();
    generateCalendar(currentYear, currentMonth);
});

// Cambia esto
const audioPlayerEl = document.getElementById('audio-player');

// Por esto (no es necesario cambiar esto si mantienes el mismo ID)