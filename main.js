"use strict";

class ShowPopoutModifyPermissions {
	static addShowCharacterListener(popout, html, data) {
		if (game.user.isGM) {
			$(html).on("click", ".share-image", () => {
				const relatedData = popout._related.data;
				const actor = game.actors.get(relatedData._id);
				this._makeCharacterVisibleToPlayers(actor);
			});
		}
	}

	static addShowJournalListener(popout, html, data) {
		if (game.user.isGM) {
			$(html).on("click", ".share-image", () => {
				const relatedData = data.entity;
				const journal = game.journal.get(relatedData._id);
				this._makeJournalVisibleToPlayers(journal);
			});
		}
	}

	static _makeCharacterVisibleToPlayers(actor) {
		if (actor) {
			this._updatePermission(actor, CONST.ENTITY_PERMISSIONS.LIMITED);
		}
	}

	static _makeJournalVisibleToPlayers(journal) {
		if (journal) {
			this._updatePermission(journal, CONST.ENTITY_PERMISSIONS.OBSERVER);
		}
	}

	static _updatePermission(object, permission) {
		if (object.data.permission.default === CONST.ENTITY_PERMISSIONS.NONE) {
			object.update(
				{
					permission: {
						...object.data.permission,
						default: permission,
					},
				},
				{ diff: false }
			);
		}
	}
}

Hooks.on("renderImagePopout", ShowPopoutModifyPermissions.addShowCharacterListener.bind(ShowPopoutModifyPermissions));
Hooks.on("renderJournalSheet", ShowPopoutModifyPermissions.addShowJournalListener.bind(ShowPopoutModifyPermissions));
