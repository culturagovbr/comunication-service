<?php

use Illuminate\Database\Seeder;

class MensagemTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $registros = DB::table('notificacao.mensagem')
            ->limit(1)
            ->get();
        if(count($registros) < 1) {
            factory(App\Models\Mensagem::class, 20)->create();
            $this->criarMensagemTeste();
        }
    }

    private function criarMensagemTeste() {
        DB::table('notificacao.mensagem')->insert([
            'titulo' => 'Teste',
            'descricao' => 'Uma mensagem teste',
            'sistema_id' => 6,
            'autor_id' => 16,
            'is_ativo' => true,
            'created_at' => New DateTime()
        ]);
    }
}
