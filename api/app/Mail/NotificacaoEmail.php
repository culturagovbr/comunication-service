<?php


namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class NotificacaoEmail extends Mailable
{
    use Queueable,
        SerializesModels;

    protected $usuario;
    protected $notificacao;

    public function __construct($usuario, $notificacao)
    {
        $this->usuario = $usuario;
        $this->notificacao = $notificacao;
    }

    public function build() {
        return $this->subject($this->notificacao->titulo)
            ->view('notificacao-email')
            ->with([
                'usuario' => $this->usuario,
                'notificacao' => $this->notificacao,
            ]);
    }
}
