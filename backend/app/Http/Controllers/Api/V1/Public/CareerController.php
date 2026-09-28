<?php

namespace App\Http\Controllers\Api\V1\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\CareerResource;
use App\Models\Career;
use Illuminate\Http\Request;

class CareerController extends Controller
{
    public function index(Request $request)
    {
        $q = Career::where('status', 'open')->where('is_active', true)->orderByDesc('published_at');
        if ($request->filled('department')) {
            $q->where('department', $request->string('department'));
        }
        if ($request->filled('location')) {
            $q->where('location', 'like', '%'.$request->string('location').'%');
        }

        return CareerResource::collection($q->paginate($request->integer('per_page', 15)));
    }

    public function show(string $slug)
    {
        $career = Career::where('slug', $slug)->where('status', 'open')->firstOrFail();

        return new CareerResource($career);
    }
}
