<?php

use App\Models\User;
use App\Notifications\ResetPasswordNotification;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Password;

it('sends a password reset link for an existing user', function () {
    $user = User::factory()->create(['email' => 'reset-me@example.com']);

    $this->postJson('/api/v1/auth/forgot-password', ['email' => $user->email])
        ->assertOk()
        ->assertJsonPath('message', 'If an account exists for that email, a password reset link has been sent.');

    expect(DB::table('password_reset_tokens')->where('email', $user->email)->exists())->toBeTrue();
});

it('does not reveal whether an unknown email exists', function () {
    $this->postJson('/api/v1/auth/forgot-password', ['email' => 'nobody@example.com'])
        ->assertOk()
        ->assertJsonPath('message', 'If an account exists for that email, a password reset link has been sent.');
});

it('resets the password with a valid token', function () {
    $user = User::factory()->create(['email' => 'reset-me@example.com']);
    $token = Password::createToken($user);

    $this->postJson('/api/v1/auth/reset-password', [
        'token' => $token,
        'email' => $user->email,
        'password' => 'NewPassword123!',
        'password_confirmation' => 'NewPassword123!',
    ])->assertOk()->assertJsonPath('message', 'Password reset successful');

    expect(Hash::check('NewPassword123!', $user->fresh()->password))->toBeTrue();
});

it('sends a reset notification linking to the frontend reset page', function () {
    Notification::fake();
    config()->set('app.frontend_url', 'https://www.example.com');
    $user = User::factory()->create(['email' => 'reset-me@example.com']);

    $this->postJson('/api/v1/auth/forgot-password', ['email' => $user->email])->assertOk();

    Notification::assertSentTo($user, ResetPasswordNotification::class, function ($notification) use ($user) {
        $mail = $notification->toMail($user);
        $url = $mail->actionUrl;

        return str_starts_with($url, 'https://www.example.com/admin/reset-password')
            && str_contains($url, 'token=');
    });
});

it('rejects an invalid reset token', function () {
    $user = User::factory()->create(['email' => 'reset-me@example.com']);

    $this->postJson('/api/v1/auth/reset-password', [
        'token' => 'not-a-real-token',
        'email' => $user->email,
        'password' => 'NewPassword123!',
        'password_confirmation' => 'NewPassword123!',
    ])->assertUnprocessable();
});

it('rejects mismatched password confirmation', function () {
    $user = User::factory()->create(['email' => 'reset-me@example.com']);
    $token = Password::createToken($user);

    $this->postJson('/api/v1/auth/reset-password', [
        'token' => $token,
        'email' => $user->email,
        'password' => 'NewPassword123!',
        'password_confirmation' => 'Different123!',
    ])->assertUnprocessable();
});
