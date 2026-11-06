<?php

namespace App\Notifications;

use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Notifications\Messages\MailMessage;

class ResetPasswordNotification extends ResetPassword
{
    /**
     * Build the mail representation of the notification, pointing the user at
     * the Next.js CMS reset page rather than a backend web route.
     */
    public function toMail($notifiable): MailMessage
    {
        $frontend = rtrim(config('app.frontend_url') ?: 'http://localhost:3000', '/');

        $url = $frontend.'/admin/reset-password?'.http_build_query([
            'token' => $this->token,
            'email' => $notifiable->getEmailForPasswordReset(),
        ]);

        return (new MailMessage)
            ->subject('Reset your password')
            ->line('You are receiving this email because we received a password reset request for your account.')
            ->action('Reset Password', $url)
            ->line('This password reset link will expire in '.config('auth.passwords.users.expire', 60).' minutes.')
            ->line('If you did not request a password reset, no further action is required.');
    }
}
