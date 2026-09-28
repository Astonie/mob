<?php

namespace App\Http\Controllers\Api\V1\Public;

use App\Http\Controllers\Controller;
use App\Http\Requests\CareerApplicationRequest;
use App\Models\Career;
use App\Models\CareerApplication;

class CareerApplicationController extends Controller
{
    public function store(CareerApplicationRequest $request, string $slug)
    {
        $career = Career::where('slug', $slug)->where('status', 'open')->firstOrFail();
        $path = null;
        $original = null;
        if ($request->hasFile('resume')) {
            $file = $request->file('resume');
            $original = $file->getClientOriginalName();
            $path = $file->store('applications/'.$career->id, 'private');
        }
        $app = CareerApplication::create([
            'career_id' => $career->id, 'first_name' => $request->string('first_name'), 'last_name' => $request->string('last_name'),
            'email' => $request->string('email'), 'phone' => $request->string('phone'),
            'cover_letter' => $request->string('cover_letter'), 'resume_path' => $path, 'resume_original_name' => $original, 'status' => 'pending',
        ]);

        return response()->json(['message' => 'Application submitted', 'data' => ['id' => $app->id]], 201);
    }
}
