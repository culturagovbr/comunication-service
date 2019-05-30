<?php

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();
        // Registra o seeder de usuário
        $this->call(SistemaTableSeeder::class);
        $this->call(UsuarioTableSeeder::class);
        $this->call(UsuarioSistemaSeeder::class);
        $this->call(PlataformaTableSeeder::class);
        $this->call(MensagemTableSeeder::class);
        $this->call(MensagemPlataformaSeeder::class);
        $this->call(NotificacaoSeeder::class);
        Model::reguard();
    }
}
