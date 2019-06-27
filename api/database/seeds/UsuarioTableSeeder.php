<?php

use Illuminate\Database\Seeder;

class UsuarioTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->criarUsuarioTeste();
    }

    private function criarUsuarioTeste() 
    {
        $usuario = App\Models\Usuario::where([
            'cpf' => '12345678901',
        ])->first();

        if (!$usuario) {
            $novoUsuario = App\Models\Usuario::firstOrNew([
                'nome' => 'Usuario Teste', 
                'cpf' => '12345678901',
                'email' => 'usuarioinicial@usuarioinicial.usuarioinicial',
                'password' => password_hash('123456', PASSWORD_BCRYPT),
                'is_ativo' => true,
                'is_admin' => true,
                'created_at' => New DateTime(),
            ]);
        }
    }
}
