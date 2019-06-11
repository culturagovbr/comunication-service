<?php

use Illuminate\Database\Seeder;

class SistemaTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $registros = DB::table('notificacao.sistema')
            ->limit(1)
            ->get();
        if(count($registros) < 1) {
            factory(App\Models\Sistema::class, 5)->create();
            $this->criarSistemaTeste('Sistema Teste', true, New DateTime(), 'https://teste.com');
        }
    }
    private function criarSistemaTeste($descricao, $is_ativo, $created_at, $url) {
        DB::table('notificacao.sistema')->insert([
            'descricao' => $descricao,
            'url' => $url,
            'is_ativo' => $is_ativo,
            'created_at' => $created_at
        ]);
    }
}
