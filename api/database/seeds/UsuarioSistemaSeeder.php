<?php

use Illuminate\Database\Seeder;

class UsuarioSistemaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $registros = DB::table('notificacao.usuario_has_sistema')
            ->limit(1)
            ->get();
        if(count($registros) < 1) {
            $this->criarVinculoTeste();
        }
    }

    private function criarVinculoTeste() {
        DB::table('notificacao.usuario_has_sistema')->insert([
            'usuario_id' => 1,
            'sistema_id' => 6,
        ]);
    }
}
