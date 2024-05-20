<?php extend('layouts/backend_layout'); ?>

<?php section('content'); ?>

    <div class="container">
        <h1 class="mt-4 mb-4"><?= lang('emergency_list') ?></h1>¨
        <div class="d-flex flex-row align-items-center" style="margin-bottom: 15px">
            <div class="container" id="emergency-list-count"></div>
            
            <button class="btn btn-primary" id="export-pdf" style="width: 200px; margin-right: 10px"><?= lang(
                'export_pdf',
            ) ?></button>
            <button class="btn btn-primary" id="export-history" style="width: 200px"><?= lang(
                'export_history',
            ) ?></button>
        </div>

        <div class="container" id="emergency-list"></div>

        <div class="modal fade" id="export-history-modal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="start-datetime" class="form-label"><?= lang('start_date_time') ?></label>
                            <input id="start-datetime" class="required form-control">
                        </div>          
                        <div class="mb-3">
                            <label for="end-datetime" class="form-label"><?= lang('end_date_time') ?></label>
                            <input id="end-datetime" class="required form-control">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" id="cancel-history-button"><?= lang('cancel') ?></button>
                        <button class="btn btn-primary" id="export-history-button"><?= lang(
                            'export_history',
                        ) ?></button>
                    </div>
                </div>
            </div>
    </div>



<?php end_section('content'); ?>

<?php section('scripts'); ?>

<script src="<?= asset_url('assets/js/utils/date.js') ?>"></script>
<script src="<?= asset_url('assets/js/utils/message.js') ?>"></script>
<script src="<?= asset_url('assets/js/utils/validation.js') ?>"></script>
<script src="<?= asset_url('assets/js/utils/url.js') ?>"></script>
<script src="<?= asset_url('assets/js/utils/ui.js') ?>"></script>
<script src="<?= asset_url('assets/js/http/emergency_list_http_client.js') ?>"></script>
<script src="<?= asset_url('assets/js/pages/emergency_list.js') ?>"></script>
<script src="https://unpkg.com/jspdf@latest/dist/jspdf.umd.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/jspdf-html2canvas@latest/dist/jspdf-html2canvas.min.js"></script>

<?php end_section('scripts'); ?>
