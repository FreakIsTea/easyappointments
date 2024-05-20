<?php defined('BASEPATH') or exit('No direct script access allowed');

class Migration_add_role_emergency_list extends CI_Migration
{
    public function up()
    {
        // Define the emergency_list field
        $emergencyListField = [
            'emergency_list' => [
                'type' => 'INT',
                'constraint' => '11',
                'default' => 0,
            ],
        ];

        // Check if the emergency_list field exists before trying to add it
        if (!$this->db->field_exists('emergency_list', 'roles')) {
            $this->dbforge->add_column('roles', $emergencyListField);
        }
        $this->db->update('roles', ['emergency_list' => '15'], ['slug' => 'admin']);

        $this->db->update('roles', ['emergency_list' => '0'], ['slug !=' => 'admin']);
    }

    public function down()
    {
        // Check if the emergency_list field exists before trying to remove it
        if ($this->db->field_exists('emergency_list', 'roles')) {
            $this->dbforge->drop_column('roles', 'emergency_list');
        }
    }
}
