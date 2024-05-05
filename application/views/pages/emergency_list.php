<?php extend('layouts/backend_layout'); ?>

<?php section('content'); ?>

    <div class="container">
        <h1 class="mt-4 mb-4"><?= lang('emergency_list') ?></h1>
        <div class="container" id="emergency-list"></div>
    </div>

<?php end_section('content'); ?>

<?php section('scripts'); ?>

<script src="<?= asset_url('assets/js/utils/date.js') ?>"></script>
<script src="<?= asset_url('assets/js/utils/message.js') ?>"></script>
<script src="<?= asset_url('assets/js/utils/validation.js') ?>"></script>
<script src="<?= asset_url('assets/js/utils/url.js') ?>"></script>
<script src="<?= asset_url('assets/js/http/emergency_list_http_client.js') ?>"></script>
<script src="<?= asset_url('assets/js/pages/emergency_list.js') ?>"></script>

<?php end_section('scripts'); ?>
