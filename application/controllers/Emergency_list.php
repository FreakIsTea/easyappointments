<?php defined('BASEPATH') or exit('No direct script access allowed');

class Emergency_list extends EA_Controller
{
    public function __construct()
    {
        parent::__construct();

        $this->load->model('appointments_model');
        $this->load->model('customers_model');
        $this->load->model('roles_model');

        $this->load->library('accounts');
        $this->load->library('timezones');
        $this->load->library('webhooks_client');
        $this->load->library('permissions');
    }

    public function index()
    {
        session(['dest_url' => site_url('emergency_list')]);

        $user_id = session('user_id');

        if (cannot('view', PRIV_EMERGENCY_LIST)) {
            if (session($user_id)) {
                abort(403, 'Forbidden');
            }

            redirect('login');

            return;
        }

        $role_slug = session('role_slug');

        $date_format = setting('date_format');
        $time_format = setting('time_format');

        script_vars([
            'user_id' => $user_id,
            'role_slug' => $role_slug,
            'date_format' => $date_format,
            'time_format' => $time_format,
            'timezones' => $this->timezones->to_array(),
        ]);

        html_vars([
            'page_title' => lang('emergency_list'),
            'active_menu' => PRIV_EMERGENCY_LIST,
            'user_display_name' => $this->accounts->get_user_display_name($user_id),
            'timezones' => $this->timezones->to_array(),
            'grouped_timezones' => $this->timezones->to_grouped_array(),
            'privileges' => $this->roles_model->get_permissions_by_slug($role_slug),
            'available_languages' => config('available_languages'),
        ]);

        $this->load->view('pages/emergency_list');
    }

    public function get_currently_checked_in_appointments()
    {
        try {
            if (cannot('view', PRIV_EMERGENCY_LIST)) {
                abort(403, 'Forbidden');
            }

            $emergency = $this->appointments_model->get_currently_checked_in_appointments();

            foreach ($emergency as &$appointment) {
                $customerId = $appointment['id_users_customer']; // Replace 'customer_id' with the actual key
                $customer = $this->customers_model->find($customerId);
                $customerWithPrefix = [];
                foreach ($customer as $key => $value) {
                    $customerWithPrefix['customer_' . $key] = $value;
                }
                $appointment = array_merge($appointment, $customerWithPrefix);
            }
            json_response($emergency);
        } catch (Throwable $e) {
            json_exception($e);
        }
    }
}
