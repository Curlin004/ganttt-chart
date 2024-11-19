document.addEventListener('DOMContentLoaded', () => {
    const ganttHeader = document.getElementById('gantt-header');
    const ganttBody = document.getElementById('gantt-body');
    const addColumnButton = document.getElementById('add-column');
    const addRowButton = document.getElementById('add-row');

    // Initialize with 12 months
    const months = ["Oktober", "November", "Dezember", "Januar", "Februar", "September"];
    months.forEach((month) => addColumn(month));

    function addColumn(month = "New Month") {
        const column = document.createElement('div');
        column.textContent = month;
        column.contentEditable = "true";
        ganttHeader.appendChild(column);

        // Adjust the header to maintain equal widths
        const totalColumns = ganttHeader.childElementCount;
        ganttHeader.style.gridTemplateColumns = `repeat(${totalColumns}, 1fr)`;
    }

    function addRow(taskName = "New Task") {
        const row = document.createElement('div');
        row.classList.add('gantt-row');

        // Task Name
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task-name');
        taskDiv.contentEditable = "true";
        taskDiv.textContent = taskName;

        // Timeline
        const timelineDiv = document.createElement('div');
        timelineDiv.classList.add('timeline');

        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.left = "100px"; // Example position
        bar.style.width = "150px"; // Example width
        bar.textContent = "Task";

        let isDragging = false;
        let startX = 0;

        bar.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
        });

        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                const deltaX = e.clientX - startX;
                startX = e.clientX;
                bar.style.left = `${parseInt(bar.style.left, 10) + deltaX}px`;
            }
        });

        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
            }
        });

        bar.addEventListener('dblclick', () => {
            const newWidth = prompt("Enter new width (px):", bar.style.width.replace("px", ""));
            if (newWidth && !isNaN(newWidth)) {
                bar.style.width = `${newWidth}px`;
            }
        });

        timelineDiv.appendChild(bar);
        row.appendChild(taskDiv);
        row.appendChild(timelineDiv);
        ganttBody.appendChild(row);
    }

    addColumnButton.addEventListener('click', () => addColumn());
    addRowButton.addEventListener('click', () => addRow());
});
