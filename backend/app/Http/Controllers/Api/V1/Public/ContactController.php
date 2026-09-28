<?php

namespace App\Http\Controllers\Api\V1\Public;

use App\Http\Controllers\Controller;
use App\Http\Requests\ContactSubmissionRequest;
use App\Models\ContactSubmission;

class ContactController extends Controller
{
    public function store(ContactSubmissionRequest $request)
    {
        if ($request->filled('website')) {
            return response()->json(['message' => 'Spam detected'], 422);
        }
        $submission = ContactSubmission::create([
            'name' => $request->string('name'), 'email' => $request->string('email'),
            'phone' => $request->string('phone'), 'company' => $request->string('company'),
            'subject' => $request->string('subject'), 'department' => $request->string('department'),
            'message' => $request->string('message'),
            'metadata' => ['ip' => $request->ip(), 'ua' => $request->userAgent()],
            'status' => 'new',
        ]);

        return response()->json(['message' => 'Message received', 'data' => ['id' => $submission->id]], 201);
    }
}
