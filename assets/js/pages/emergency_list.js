App.Pages.EmergencyList = (function () {
    const fetchCurrentlyCheckedInAppointments = () => {
        App.Http.EmergencyList.getCurrentlyCheckedInAppointments()
            .then((response) => {
                const properties = new Map()
                    .set('customer_first_name', lang('first_name'))
                    .set('customer_last_name', lang('last_name'))
                    .set('customer_phone_number', lang('phone'))
                    .set('customer_mobile_number', lang('mobile'))
                    .set('checkin_datetime', lang('checkin'));

                const table = document.createElement('table');
                table.className = 'table';

                if (!Array.isArray(response)) throw new Error('Response is not an array');

                // Create table header
                const header = table.createTHead();
                const headerRow = header.insertRow();
                for (const [_, value] of properties.entries()) {
                    const th = document.createElement('th');
                    th.textContent = value;
                    headerRow.appendChild(th);
                }

                // Create table body
                response.forEach((appointment) => {
                    console.log('Appointment:', appointment);

                    const row = table.insertRow();
                    for (const [key, _] of properties.entries()) {
                        const cell = row.insertCell();
                        cell.textContent = appointment[key];
                    }
                });

                document.getElementById('emergency-list').appendChild(table);
            })
            .catch((error) => {
                console.log('Error fetching currently checked in appointments:', error);
            });
    };

    document.addEventListener('DOMContentLoaded', fetchCurrentlyCheckedInAppointments);
})();
