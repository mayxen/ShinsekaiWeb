<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class NotifyOwner extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */

    public $email;
    public $name;
    public $phone_number;
    public $url;
    public $ownerName;
    public $homeName;
    public $reason;

    public function __construct($email, $name, $phone_number, $ownerName, $idHome, $homeName, $reason)
    {
        $this->email = $email;
        $this->name = $name;
        $this->phone_number = $phone_number;
        $this->url = env('APP_URL', 'http://127.0.0.1:8000') . "/home/" . $idHome;
        $this->ownerName = $ownerName;
        $this->homeName = $homeName;
        $this->reason = $reason;
    }

    /**
     * Build the message.
     *
     * @return NotifyOwner
     */
    public function build()
    {
        return $this->view('mail.notifyOwner');
    }
}
