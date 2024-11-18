<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    // Lister toutes les notifications
    public function index()
    {
        $notifications = Notification::with('user')->get();
        return response()->json($notifications);
    }

    // Ajouter une notification
    public function store(Request $request)
    {
        $this->validate($request, [
            'message' => 'required|string',
            'type' => 'required|string',
        ]);
        if (!Auth::check()) {
            return response()->json(['error' => 'Utilisateur non authentifié'], 401);
        }

        $notification = Notification::create([
            'message' => $request->message,
            'type' => $request->type,
            'id_user' => Auth::id(), // Enregistre l'utilisateur authentifié comme auteur
        ]);
        $notification->load('user');

        return response()->json(['message' => 'Notification créée avec succès', 'notification' => $notification]);
    }

    // Modifier une notification
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'message' => 'required|string',
            'type' => 'required|string',
        ]);

        $notification = Notification::findOrFail($id);
        $notification->update([
            'message' => $request->message,
            'type' => $request->type,
        ]);
        $notification->load('user');

        return response()->json(['message' => 'Notification mise à jour avec succès', 'notification' => $notification]);
    }

    // Supprimer une notification
    public function destroy($id)
    {
        $notification = Notification::findOrFail($id);
        $notification->delete();

        return response()->json(['message' => 'Notification supprimée avec succès']);
    }
}
