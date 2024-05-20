App.Pages.EmergencyList = (function () {
    let modal = null;

    const fetchCurrentlyCheckedInAppointments = () => {
        App.Http.EmergencyList.getCurrentlyCheckedInAppointments()
            .then((response) => {
                const appointmentCount = response.length;
                const countElement = document.createElement('p');
                countElement.innerHTML = `${lang('emergency_list_count')}: <strong>${appointmentCount}</strong>`;
                document.getElementById('emergency-list-count').appendChild(countElement);

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
                    const row = table.insertRow();
                    for (const [key, _] of properties.entries()) {
                        const cell = row.insertCell();
                        cell.textContent = appointment[key];
                    }
                });

                document.getElementById('emergency-list').appendChild(table);
            })
            .catch((error) => {
                console.error('Error fetching currently checked in appointments:', error);
            });
    };

    const initializeDatePicker = () => {
        const startDateTimeControl = $('#start-datetime');
        const endDateTimeControl = $('#end-datetime');

        App.Utils.UI.initializeDateTimePicker(startDateTimeControl, {
            onClose: () => {},
        });
        App.Utils.UI.initializeDateTimePicker(endDateTimeControl, {
            onClose: () => {},
        });

        const startMoment = moment();

        // Set start date 1 week back
        startMoment.subtract(1, 'week');

        App.Utils.UI.setDateTimePickerValue(startDateTimeControl, startMoment.toDate());
        App.Utils.UI.setDateTimePickerValue(endDateTimeControl, moment().toDate());

        // const startDateTimeObject = App.Utils.UI.getDateTimePickerValue($startDatetime);
        // startDateTimeControl = moment(startDateTimeObject).format('YYYY-MM-DD HH:mm:ss');

        // const endDateTimeObject = App.Utils.UI.getDateTimePickerValue($endDatetime);
        // endDateTimeControl = moment(endDateTimeObject).format('YYYY-MM-DD HH:mm:ss');

        // if (startDateTimeObject > endDateTimeObject) {
        //     $startDatetime.addClass('is-invalid');
        //     $endDatetime.addClass('is-invalid');
        //     throw new Error(lang('start_date_before_end_error'));
        // }

        // startDateTimeControl = moment(startDateTimeObject).format('YYYY-MM-DD HH:mm:ss');
    };

    const exportEmergencyList = () => {
        html2PDF(document.getElementById('emergency-list'), {
            jsPDF: {
                format: 'a4',
            },
            margin: {
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
            },
            output: 'emergency-list.pdf',
        });
    };

    const exportHistory = (response) => {
        const container = document.getElementById('history-export-container');
        const p = document.createElement('p');
        const startDate = App.Utils.UI.getDateTimePickerValue($('#start-datetime'));
        const endDate = App.Utils.UI.getDateTimePickerValue($('#end-datetime'));
        const dateRangeString = `${moment(startDate).format('YYYY-MM-DD HH:mm:ss')} - ${moment(endDate).format(
            'YYYY-MM-DD HH:mm:ss',
        )}`;

        p.innerHTML = `<strong>${lang('date_range')}:</strong> ${dateRangeString}`;
        container.appendChild(p);

        const table = document.createElement('table');
        table.className = 'table';
        const properties = new Map()
            .set('customer_first_name', lang('first_name'))
            .set('customer_last_name', lang('last_name'))
            .set('customer_phone_number', lang('phone'))
            .set('customer_mobile_number', lang('mobile'))
            .set('checkin_datetime', lang('checkin'))
            .set('checkout_datetime', lang('checkout'));

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
            const row = table.insertRow();
            for (const [key, _] of properties.entries()) {
                const cell = row.insertCell();
                cell.textContent = appointment[key];
            }
        });

        if (response.length === 0) container.appendChild((document.createElement('p').innerHTML = lang('no_results')));
        else container.appendChild(table);

        const dateTimeStamp = moment().format('YYYY-MM-DD');
        html2PDF(container, {
            jsPDF: {
                format: 'a4',
            },
            margin: {
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
            },
            output: `report-${dateTimeStamp}.pdf`,
        });

        container.innerHTML = '';
    };

    document.getElementById('export-history').addEventListener('click', () => {
        modal = new bootstrap.Modal(document.getElementById('export-history-modal'));
        modal.show();
    });

    document.getElementById('cancel-history-button').addEventListener('click', () => {
        modal.hide();
    });

    document.getElementById('export-history-button').addEventListener('click', () => {
        const startDate = App.Utils.UI.getDateTimePickerValue($('#start-datetime'));
        const endDate = App.Utils.UI.getDateTimePickerValue($('#end-datetime'));
        App.Http.EmergencyList.getHistoryByDate(startDate, endDate)
            .then((response) => {
                if (!Array.isArray(response)) throw new Error('Response is not an array');
                exportHistory(response);
                modal.hide();
            })
            .catch((error) => {
                console.error('Error fetching history:', error);
            });
    });

    document.getElementById('export-pdf').addEventListener('click', () => {
        exportEmergencyList();
    });

    document.addEventListener('DOMContentLoaded', () => {
        fetchCurrentlyCheckedInAppointments();
        initializeDatePicker();
    });
})();
