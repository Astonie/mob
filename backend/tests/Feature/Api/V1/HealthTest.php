<?php

it('returns health ok', function () {
    $response = $this->getJson('/api/v1/health');
    $response->assertOk()->assertJson(['status' => 'ok']);
});
