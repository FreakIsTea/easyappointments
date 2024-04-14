<?php defined('BASEPATH') or exit('No direct script access allowed');

class Migration_add_checkin_checkout extends CI_Migration
{
    public function up()
    {
        // Define the checkin_datetime field
        $checkinField = [
            'checkin_datetime' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
        ];

        // Define the checkout_datetime field
        $checkoutField = [
            'checkout_datetime' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
        ];

        // Check if the checkin_datetime field exists before trying to add it
        if (!$this->db->field_exists('checkin_datetime', 'appointments')) {
            $this->dbforge->add_column('appointments', $checkinField);
        }

        // Check if the checkout_datetime field exists before trying to add it
        if (!$this->db->field_exists('checkout_datetime', 'appointments')) {
            $this->dbforge->add_column('appointments', $checkoutField);
        }
    }

    public function down()
    {
        // Check if the checkin_datetime field exists before trying to remove it
        if ($this->db->field_exists('checkin_datetime', 'appointments')) {
            $this->dbforge->drop_column('appointments', 'checkin_datetime');
        }

        // Check if the checkout_datetime field exists before trying to remove it
        if ($this->db->field_exists('checkout_datetime', 'appointments')) {
            $this->dbforge->drop_column('appointments', 'checkout_datetime');
        }
    }
}
