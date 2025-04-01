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

    // Lista de audios (tu contenido)
    const audios = [
        // ... (tu lista completa de audios aquí)

/* Enero*/

        { nombre: "Santa Maria Madre de Dios", archivo: "/ev/tc/4/mar/audio.mp3", fecha: `${year}-04-01` },


        { nombre: "IV Semana de Cuaresma", archivo: "/ev/tc/4/mar/audio.mp3", fecha: `2025-04-01` },
        { nombre: "IV Semana de Cuaresma", archivo: "/ev/tc/4/mie/audio.mp3", fecha: `2025-04-02` },
        { nombre: "IV Semana de Cuaresma", archivo: "/ev/tc/4/jue/audio.mp3", fecha: `2025-04-03` },
        { nombre: "IV Semana de Cuaresma", archivo: "/ev/tc/4/jue/audio.mp3", fecha: `2025-04-04` },

        { nombre: "IV Semana de Cuaresma", archivo: "/ev/tc/4/jue/audio.mp3", fecha: `2026-04-01` },

        // ... resto de tus audios
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
        // Años disponibles (puedes ajustar según necesites)
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

    // Generar el calendario
    function generateCalendar(year, month) {
        calendarEl.innerHTML = '';
        monthYearEl.textContent = `${monthNames[month]} ${year}`;

        // Encabezados de los días
        ['Domingo', 'Lunes', 'Martes', 'Miécoles', 'Jueves', 'Viernes', 'Sábado'].forEach(day => {
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

            // Resaltar día actual
            if (currentDate.toDateString() === today.toDateString()) {
                dayEl.classList.add('today');
                // Reproducir audio del día actual
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