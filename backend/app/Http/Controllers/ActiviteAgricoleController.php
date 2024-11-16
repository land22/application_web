<?php
// app/Http/Controllers/ActiviteAgricoleController.php
namespace App\Http\Controllers;

use App\Models\ActiviteAgricole;
use App\Models\Culture;
use Illuminate\Http\Request;

class ActiviteAgricoleController extends Controller
{
    public function index()
    {
        $activites = ActiviteAgricole::with('culture')->get();
        return response()->json($activites);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|string',
            'description' => 'required|string',
            'date' => 'required|date',
            'id_culture' => 'required|exists:cultures,id'
        ]);

        $activite = ActiviteAgricole::create($validated);
        $activite->load('culture');
        return response()->json($activite, 201);
    }

    public function update(Request $request, $id)
    {
        $activite = ActiviteAgricole::findOrFail($id);
        $validated = $request->validate([
            'type' => 'required|string',
            'description' => 'required|string',
            'date' => 'required|date',
            'id_culture' => 'required|exists:cultures,id'
        ]);

        $activite->update($validated);
        $activite->load('culture');
        return response()->json($activite);
    }

    public function destroy($id)
    {
        $activite = ActiviteAgricole::findOrFail($id);
        $activite->delete();
        return response()->json(null, 204);
    }
}
