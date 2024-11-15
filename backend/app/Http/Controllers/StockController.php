<?php
// app/Http/Controllers/StockController.php
namespace App\Http\Controllers;

use App\Models\Stock;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class StockController extends Controller
{
    // Constructor to apply authentication
    public function __construct()
    {
        //$this->middleware('auth:api');
    }

    // Afficher tous les stocks de l'utilisateur
    public function index()
    {
        $stocks = Stock::where('user_id', Auth::id())->get(); // Récupérer les stocks de l'utilisateur connecté
        return response()->json($stocks);
    }

    // Ajouter un nouvel article au stock
    public function store(Request $request)
    {
        $request->validate([
            'article_name' => 'required|string',
            'quantity' => 'required|integer|min:1',
            'description' => 'nullable|string',
        ]);

        $stock = Stock::create([
            'user_id' => Auth::id(),
            'article_name' => $request->article_name,
            'quantity' => $request->quantity,
            'description' => $request->description,
        ]);

        return response()->json($stock, 201); // Retourner l'article ajouté
    }

    // Modifier un article
    public function update(Request $request, $id)
    {
        $request->validate([
            'article_name' => 'required|string',
            'quantity' => 'required|integer|min:1',
            'description' => 'nullable|string',
        ]);

        $stock = Stock::where('user_id', Auth::id())->findOrFail($id); // Vérifier si l'article appartient à l'utilisateur

        $stock->update([
            'article_name' => $request->article_name,
            'quantity' => $request->quantity,
            'description' => $request->description,
        ]);

        return response()->json($stock);
    }

    // Supprimer un article
    public function destroy($id)
    {
        $stock = Stock::where('user_id', Auth::id())->findOrFail($id);
        $stock->delete();

        return response()->json(['message' => 'Article supprimé avec succès']);
    }
}