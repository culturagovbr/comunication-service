<?php


namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class NovaContaEmail extends Mailable
{
    use Queueable,
        SerializesModels;

    protected $usuario;

    public function __construct($usuario)
    {
        $this->usuario= $usuario;
    }

    public function build() {
        return $this->subject('Conta Criada Servico Notificacao')
            ->view('nova-conta-email')
            ->with([
                'usuario' => $this->usuario,
            ]);
    }
}
