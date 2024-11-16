<?php
namespace App\Http\Controllers;

use App\Models\Culture;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CultureController extends Controller
{
    public function __construct()
    {
        // $this->middleware('auth:api');
    }

    public function index()
    {
        $cultures = Culture::where('user_id', Auth::id())->get();
        return response()->json($cultures);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string',
            'type' => 'required|string',
            'date_plantation' => 'required|date',
            'date_recolte' => 'required|date|after_or_equal:date_plantation',
            'statut' => 'required|string',
        ]);

        $culture = Culture::create([
            'nom' => $request->nom,
            'type' => $request->type,
            'date_plantation' => $request->date_plantation,
            'date_recolte' => $request->date_recolte,
            'statut' => $request->statut,
            'user_id' => Auth::id(),
        ]);

        return response()->json($culture, 201);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'nom' => 'required|string',
            'type' => 'required|string',
            'date_plantation' => 'required|date',
            'date_recolte' => 'required|date|after_or_equal:date_plantation',
            'statut' => 'required|string',
        ]);

        $culture = Culture::where('user_id', Auth::id())->findOrFail($id);
        $culture->update($request->all());

        return response()->json($culture);
    }

    public function destroy($id)
    {
        $culture = Culture::where('user_id', Auth::id())->findOrFail($id);
        $culture->delete();

        return response()->json(['message' => 'Culture supprimée avec succès']);
    }
}
