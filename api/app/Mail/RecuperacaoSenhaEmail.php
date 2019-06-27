<?php


namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class RecuperacaoSenhaEmail extends Mailable
{
    use Queueable,
        SerializesModels;

    protected $usuario;

    public function __construct($usuario)
    {
        $this->usuario = $usuario;
    }

    public function build() {
        return $this->subject('Redefinicao de senha')
            ->view('recuperar-senha-email')
            ->with([
                'usuario' => $this->usuario,
            ]);
    }
}
